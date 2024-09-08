import "./style.css";

export const getBucketListNavigator = (BucketList) => {
  const bucketUL = document.createElement("ul");
  for (let bucket of BucketList) {
    const bucketLI = document.createElement("li");
    const subBucketUL = document.createElement("ul");
    const bucketTitle = document.createElement("li");
    const subBucketTodos = document.createElement("li");
    const subBucketNotes = document.createElement("li");

    bucketTitle.innerText = bucket.title;
    subBucketTodos.innerText = "Todos";
    subBucketNotes.innerText = "Notes";

    bucketUL.append(bucketTitle);
    subBucketUL.append(subBucketTodos);
    subBucketUL.append(subBucketNotes);
    bucketLI.append(subBucketUL);
    bucketUL.append(bucketLI);
  }

  return bucketUL;
};
