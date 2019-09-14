export const ImageToDataUrl = async (url: string, format: string = 'image/jpeg') => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.addEventListener(
      'load',
      () => {
        const canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        let dataURL;

        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(format);
        resolve(dataURL);
      },
      false,
    );

    img.src = `http://localhost:3000/image-proxy?url=${url}`;

    img.addEventListener('error', (err) => {
      reject(err);
    });
  });
};
