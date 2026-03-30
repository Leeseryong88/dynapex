import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from './config'

export async function uploadImage(file, path) {
  const storageRef = ref(storage, path)
  const snap = await uploadBytes(storageRef, file)
  return getDownloadURL(snap.ref)
}

export async function deleteImage(path) {
  try {
    await deleteObject(ref(storage, path))
  } catch (e) {
    if (e.code !== 'storage/object-not-found') throw e
  }
}
