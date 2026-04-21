const [taskData, setTaskData] = useState([]);
const [selectedTask, setSelectedTask] = useState([]);

const selectSingleItem = (id) => {
  if (selectedTask.includes(id)) {
    let items = selectedTask.filter((item) => item !== id);
    setSelectedTask(items); // ✅ fixed
  } else {
    setSelectedTask([id, ...selectedTask]);
  }
};

const selectAll = (event) => {
  if (event.target.checked) {
    let items = taskData?.map((item) => item._id) || [];
    setSelectedTask(items);
  } else {
    setSelectedTask([]);
  }
};

const deleteMultiple = async () => {
  let item = await fetch("http://localhost:3200/delete-multiple/", {
    method: "DELETE",
    credentials: "include",
    body: JSON.stringify(selectedTask),
    headers: {
      "Content-Type": "application/json",
    },
  });

  item = await item.json();

  if (item.success) {
    getListData();
    setSelectedTask([]); // ✅ reset selection
  } else {
    alert("Try after sometime");
  }
};
