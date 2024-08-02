export const setPhotoLibraryCaption = (
  name: string,
  launch_date: string,
  status: string,
  max_sol: number,
  max_date: string,
  total_photos: number
) =>
  `Photo Library Information:
Rover Name: ${name}
Launch Date: ${launch_date}
Status: ${status}
Max Sol: ${max_sol}
Max Date: ${max_date}
Total Photos: ${total_photos}`;
