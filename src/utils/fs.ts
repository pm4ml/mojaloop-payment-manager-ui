import { Toast } from 'components';

// The save as dialog only works on latest versions of edge or chrome.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveAsWriteFile(suggestedName: string, contents: any) {
  const options = {
    suggestedName,
  };

  // @ts-ignore
  const fileHandle = await window.showSaveFilePicker(options);

  if (typeof fileHandle !== 'undefined') {
    if ((await fileHandle.queryPermission()) === 'granted') {
      // Create a FileSystemWritableFileStream to write to.
      const writable = await fileHandle.createWritable();
      // Write the contents of the file to the stream.
      await writable.write(contents);
      // Close the file and write the contents to disk.
      await writable.close();
      Toast.show({
        kind: 'success',
        closeable: true,
        title: 'Saved Successfully',
      });
    }
  }
}
