"use strict";

const path = require("path");
const { readStorage, writeStorage } = require("./readWrite");
const { storageFile, storageAdapter } = require("./storageConfig.json");
const { toNumber } = require(path.join(__dirname, storageAdapter));
const storageFilePath = path.join(__dirname, storageFile);

async function getAllItems() {
  return readStorage(storageFilePath);
}

async function getOneItem(id) {
  const data = await readStorage(storageFilePath);
  return data.find((item) => item.id == id) || null;
}

async function addItemToStorage(newItem) {
  const data = await readStorage(storageFilePath);
  data.push(toNumber(newItem));
  await writeStorage(storageFilePath, data);
}

async function updateItem(updatedItem) {
  const data = await readStorage(storageFilePath);
  const originalItem = data.find((item) => item.id == updatedItem.id);
  if (originalItem) {
    Object.assign(originalItem, toNumber(updatedItem));
    return await writeStorage(storageFilePath, data);
  } else {
    return false;
  }
}

async function removeItem(id) {
  const data = await readStorage(storageFilePath);
  const ItemIndex = data.findIndex((item) => item.id == id);
  if (ItemIndex > 0) {
    data.splice(ItemIndex, 1);
    return await writeStorage(storageFilePath, data);
  } else {
    return false;
  }
}
module.exports = {
  getAllItems,
  getOneItem,
  addItemToStorage,
  updateItem,
  removeItem,
};
