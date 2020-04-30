import { FileItem, FileStatus } from "./types";
import { uploadNewFile, checkFileExist, refExistFile } from "../../api/file";
import { FetchError } from "../../api";

export class FileListUpload {
  private files: FileItem[];
  private workers: UploadWorker[];
  private storageId: string;
  private workerScript: string;
  private callback: (info: {
    iscomplete: boolean;
    id?: string;
    status?: FileStatus;
    error?: FetchError;
  }) => void = () => { };
  constructor(files: FileItem[], storageId: string, scriptPath: string, workerCount: number = 6) {
    this.files = [...files];
    this.workers = [];
    this.storageId = storageId;
    this.workerScript = scriptPath;
    while (this.workers.length < workerCount) {
      this.workers.push(new UploadWorker(this.workerScript));
    }
  }

  startUpload() {
    this.workers.forEach((worker) => {
      worker.addListener((info) => {
        this.handleWokerComplete(info, worker)
      });
      this.sendNext(worker);
    });
  }

  private handleWokerComplete(
    info: { id: string; status: FileStatus; error?: FetchError },
    worker: UploadWorker
  ) {
    let iscomplete = false;
    if (info.status === FileStatus.UPLOAD_FAIL || info.status === FileStatus.UPLOAD_SUCCESS) {
      let busyWorker = this.workers.filter((item) => !item.free);
      iscomplete = busyWorker.length === 0;
      if (!iscomplete) {
        this.sendNext(worker);
      } else {
        this.workers.forEach(worker => {
          worker.destory();
        })
      }
    }
    this.callback({
      iscomplete,
      id: info.id,
      status: info.status,
      error: info.error,
    });
  }

  private sendNext(worker: UploadWorker) {
    const preFile = this.getPreFile();
    if (preFile && worker.free) {
      preFile.status = FileStatus.READY_UPLOAD;
      this.callback({
        iscomplete: false,
        id: preFile.id,
        status: FileStatus.READY_UPLOAD,
      });
      worker.sendFile(preFile, this.storageId);
    }
  }

  listener(
    callback: (info: {
      iscomplete: boolean;
      id?: string;
      status?: FileStatus;
      error?: FetchError;
    }) => void
  ) {
    this.callback = callback;
    return this;
  }

  private getPreFile() {
    const item = this.files.find((iem) => iem.status === FileStatus.PRE_UPLOAD);
    return item || null;
  }
}

class UploadWorker {
  private isFree: boolean;
  private workerScriptPath: string;
  private worker: Worker;
  private file: FileItem | null = null;
  private storageId = "";
  private listener: (info: {
    id: string;
    status: FileStatus;
    error?: FetchError;
  }) => void = () => { };
  get free() {
    return this.isFree;
  }

  constructor(script: string) {
    this.workerScriptPath = script;
    this.worker = new Worker(this.workerScriptPath);
    this.isFree = true;
    this.worker.onmessage = this.recieveHash.bind(this);
  }

  addListener(
    fun: (info: { id: string; status: FileStatus; error?: FetchError }) => void
  ) {
    this.listener = fun;
  }

  recieveHash(msg: any) {
    if (msg.data && this.file) {
      this.listener({ id: this.file.id, status: FileStatus.UPlOADING });
      const file = this.file;
      checkFileExist(msg.data).then(res => {
        return this.uploadFile(res, this.file as FileItem, this.storageId, msg.data)
      }).then(upload_response => {
        this.handleUploadResult(upload_response, file)
      }).catch((err) => {
        this.isFree = true;
        this.listener({ id: file.id, status: FileStatus.UPLOAD_FAIL, error: err });
      });
    } else {

    }
  }


  uploadFile(exist: boolean, file: FileItem, storageId: string, hash: string) {
    if (exist) {
      return refExistFile(hash, storageId, file.name)
    } else {
      return uploadNewFile({
        zly_file: file.file,
        storage_id: storageId,
        file_hash: hash
      }, {
        "Upload-Info": `zly_file;${file.size}`
      })
    }
  }

  handleUploadResult(res: String | null, file: FileItem) {
    this.isFree = true;
    if (res) {
      this.listener({ id: file.id, status: FileStatus.UPLOAD_SUCCESS });
    } else {
      this.listener({ id: file.id, status: FileStatus.UPLOAD_FAIL });
    }
  }

  async sendFile(file: FileItem, storageId: string) {
    this.file = file;
    this.storageId = storageId;
    this.isFree = false;
    this.listener({ id: file.id, status: FileStatus.CALC_HASH });
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const buffer = fileReader.result as ArrayBuffer;
      this.worker.postMessage(buffer, [buffer]);
    }
    fileReader.readAsArrayBuffer(file.file);
  }

  destory() {
    this.worker.terminate();
  }
}
