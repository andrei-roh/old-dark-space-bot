"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPhotoLibraryCaption = void 0;
const setPhotoLibraryCaption = (name, launch_date, status, max_sol, max_date, total_photos) => `Photo Library Information:
Rover Name: ${name}
Launch Date: ${launch_date}
Status: ${status}
Max Sol: ${max_sol}
Max Date: ${max_date}
Total Photos: ${total_photos}`;
exports.setPhotoLibraryCaption = setPhotoLibraryCaption;
