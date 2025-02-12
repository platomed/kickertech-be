import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export interface FileState {
  id: string;
  name: string;
  active: boolean;
}

@Injectable()
export class FilesService {
  private state: FileState[] = [];
  private readonly DIRECTORY_PATH = './files';

  async scanFiles() {
    const files = await fs.readdir(this.DIRECTORY_PATH);
    const currentFiles = new Set(files);

    this.state = this.state.map(file =>
      currentFiles.has(file.name) ? { ...file } : { ...file, active: false }
    );

    const newFiles = files
      .filter(file => !this.state.some(f => f.name === file && f.active === true))
      .map(file => ({ id: uuidv4(), name: file, active: true }));

    this.state = [...this.state, ...newFiles];

    return this.state;
  }

  getFileList() {
    return this.state.filter(file => file.active);
  }

  getState() {
    return this.state;
  }
}
