const ImageKit = require("imagekit");

const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: "https://ik.imagekit.io/cbn7ra7lt"
})

async function uploadFile(fileBuffer) {
    const result = await ImageKitClient.upload({
        file: fileBuffer,
        fileName: 'music_' + Date.now(),
        folder: 'spotifybackend/music'
    });
    return result;
}

async function deleteFile(fileId) {
    await ImageKitClient.deleteFile(fileId);
}

module.exports = { uploadFile, deleteFile };