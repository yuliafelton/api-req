function getRandomInteger(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

function cutRandomElementFromArray(arr) {
  const randomIndex = getRandomInteger(0, arr.length - 1);
  const modifiedArr = [...arr];
  modifiedArr.splice(randomIndex, 1);
  return {
    element: arr[randomIndex],
    modifiedArr
  };
}

const mapIds = (users) => {
  const listOfIds = users.map(user => user.id);
  const {element: userIdToExclude, modifiedArr} = cutRandomElementFromArray(listOfIds);
  const {element: secondUserIdToExclude} = cutRandomElementFromArray(modifiedArr);

  return users
      .filter(user =>  user.id !== userIdToExclude && user.id !== secondUserIdToExclude)
      .map(user => `${user.name} ${user.username}`)
};

let usersStorage;

const fetchUsers = async () => {
  try{
    const res = await fetch("http://jsonplaceholder.typicode.com/users");
    usersStorage = await res.json();
  } catch (e) {
    console.log(e);
  }
};

fetchUsers().then(() =>{
  console.log(mapIds(usersStorage));
});

document.querySelector('#mapBtn').addEventListener('click', () => {
  console.log(mapIds(usersStorage));
});
