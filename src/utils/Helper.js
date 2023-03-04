import { saveAs } from "file-saver";

export const DownloadFile = (url) => {
  saveAs(url, url?.split("media/")[1]);
};
