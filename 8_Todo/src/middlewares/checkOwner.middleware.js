import { MainTodo } from "../models/MainTodo.model.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";

const checkTodoOwnership = asyncHandler(async (req, res, next) => {
  // const { MainTodoID, subTodoID } = req.body || req.params; 

const MainTodoID = req.body?.MainTodoID || req.params?.MainTodoID;
const subTodoID = req.body?.subTodoID || req.params?.subTodoID;

  let todo;

  console.log('Request body:', req.body);

  try {
    // Check for MainTodoID
    if (MainTodoID) {
      todo = await MainTodo.findById(MainTodoID);
      console.log("maintodo", todo);
    }
    // Check for subTodoID
    else if (subTodoID) {
      todo = await MainTodo.findOne({ subTodo: subTodoID });
      console.log("subtodo", todo);
    }

    if (!todo) {
      console.log("if", todo);
      return res.status(404).json({ message: 'Todo not found' });
    }

    console.log("todo", todo);

    // Check if the user making the request is the creator of the todo
    if (todo.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (error) {
    console.error('Error checking todo ownership:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default checkTodoOwnership;

