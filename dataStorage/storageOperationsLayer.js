"use strict";

const {
  getAllItems,
  getOneItem,
  addItemToStorage,
  updateItem,
  removeItem,
} = require("./dataOperationsLayer");

const { CODES, MESSAGES } = require("./status");

module.exports = class storageOperations {
  get CODES() {
    return CODES;
  }
  getAll() {
    return getAllItems();
  }
  getOne(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("Storage empty!!!"));
      } else {
        const res = await getOneItem(id);
        // res ? resolve(res) : reject(MESSAGES.NOT_FOUND(id));
        if (res) {
          resolve(res);
        } else {
          reject(MESSAGES.NOT_FOUND(id));
        }
      }
    });
  }
  insert(item) {
    return new Promise(async (resolve, reject) => {
      if (item) {
        if (!item.id) {
          reject(MESSAGES.NOT_INSERTED());
        } else if (await getOneItem(item.id)) {
          reject(MESSAGES.ALREADY_IN_USE(item.id));
        } else if (await addItemToStorage(item)) {
          resolve(MESSAGES.INSERT_OK(item.id));
        } else {
          reject(MESSAGES.NOT_INSERTED());
        }
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }
  update(item) {
    return new Promise(async (resolve, reject) => {
      if (item) {
        if (await updateItem(item)) {
          resolve(MESSAGES.UPDATE_OK(item.id));
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } else {
        reject(MESSAGES.NOT_UPDATED());
      }
    });
  }
  remove(id) {
    return new Promise(async (resolve, reject) => {
      if (!id) {
        reject(MESSAGES.NOT_FOUND("--empty--"));
      } else if (await removeItem(id)) {
        resolve(MESSAGES.REMOVE_OK(id));
      } else {
        reject(MESSAGES.NOT_REMOVED(id));
      }
    });
  }
};
