import { Controller, Get } from '@nestjs/common';

import { FilesService, FileState } from './files.service';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('/scan')
  async scanFiles(): Promise<FileState[]> {
    return await this.filesService.scanFiles();
  }

  @Get('/list')
  getFilesList(): FileState[] {
    return this.filesService.getFileList();
  }

  @Get('/download-state')
  getState(): FileState[] {
    return this.filesService.getState();
  }
}
