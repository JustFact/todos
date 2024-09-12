import "./style.css";

const expand = (e) => {
  e.target.nextSibling.firstChild.classList.toggle("show");
};

export const getBucketListNavigator = (BucketList) => {
  const bucketUL = document.createElement("ul");
  for (let i = 0; i < BucketList.length; i++) {
    const bucketLI = document.createElement("li");
    const subBucketUL = document.createElement("ul");
    const bucketTitle = document.createElement("li");
    const subBucketTodos = document.createElement("li");
    const subBucketNotes = document.createElement("li");

    bucketTitle.innerText = BucketList[0].title;
    subBucketTodos.innerText = "Todos";
    subBucketTodos.dataset.index = `todo#${i}#00`;
    subBucketNotes.innerText = "Notes";
    subBucketNotes.dataset.index = `note#${i}#01`;

    bucketTitle.addEventListener("click", expand);

    bucketUL.append(bucketTitle);
    subBucketUL.append(subBucketTodos);
    subBucketUL.append(subBucketNotes);
    bucketLI.append(subBucketUL);
    bucketUL.append(bucketLI);
  }

  return bucketUL;
};
