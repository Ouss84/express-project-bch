"use strict";

function toNumber(item) {
  return Object.assign(item, {
    id: +item.id,
    amount: +item.amount,
  });
}

module.exports = { toNumber };
