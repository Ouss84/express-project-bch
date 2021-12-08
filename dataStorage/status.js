"use strict";

const CODES = {
  ERROR: 0,
  NOT_FOUND: 1,
  INSERT_OK: 2,
  NOT_INSERTED: 3,
  ALREADY_IN_USE: 4,
  REMOVE_OK: 5,
  NOT_REMOVED: 6,
  UPDATE_OK: 7,
  NOT_UPDATED: 8,
};

const MESSAGES = {
  ERROR: () => ({
    message: "An error in the program has occured!",
    code: CODES.ERROR,
    type: "error",
  }),
  NOT_FOUND: (id) => ({
    message: `The item with the id: ${id} was NOT found!`,
    code: CODES.NOT_FOUND,
    type: "error",
  }),
  INSERT_OK: (id) => ({
    message: `The item with the id: ${id} was INSERTED successfully`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
  NOT_INSERTED: () => ({
    message: `The item was NOT inserted!`,
    code: CODES.NOT_INSERTED,
    type: "error",
  }),
  ALREADY_IN_USE: (id) => ({
    message: `The item with the id: ${id} is ALREADY IN USE!`,
    code: CODES.ALREADY_IN_USE,
    type: "error",
  }),
  REMOVE_OK: (id) => ({
    message: `The item with the id: ${id} was REMOVED successfully`,
    code: CODES.REMOVE_OK,
    type: "info",
  }),
  NOT_REMOVED: (id) => ({
    message: `The item with the id: ${id} was NOT REMOVED!`,
    code: CODES.NOT_REMOVED,
    type: "error",
  }),
  UPDATE_OK: (id) => ({
    message: `The item with the id: ${id} was Updated successfully`,
    code: CODES.UPDATE_OK,
    type: "info",
  }),
  NOT_UPDATED: () => ({
    message: `The item was NOT UPDATED`,
    code: CODES.NOT_UPDATED,
    type: "error",
  }),
};

module.exports = { CODES, MESSAGES };
