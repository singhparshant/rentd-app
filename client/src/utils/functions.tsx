export const readFileContent = async (file: any) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const fileReader = new FileReader();
      fileReader.onload = async (fileLoadedEvent) => {
        const result = fileLoadedEvent.target?.result as string;
        resolve(result);
      };
      fileReader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });
};
