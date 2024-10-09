import { createBucket } from "./bucket";

export const checkLocalStorage = () => {
  if (
    localStorage.getItem("bucketTitle") &&
    localStorage.getItem("bucketData")
  ) {
    return getLocalStorageData();
  } else {
    return [];
  }
};

export const getLocalStorageData = () => {
  let titles = JSON.parse(localStorage.getItem("bucketTitle"));
  let data = JSON.parse(localStorage.getItem("bucketData"));
  let bucketList = [];
  for (let i = 0; i < titles.length; i++) {
    let bucket = createBucket(titles[i].title);
    bucket.setBucket(data[i]);
    bucketList.push(bucket);
  }
  return bucketList;
};

export const bucketList = checkLocalStorage();
