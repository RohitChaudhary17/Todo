import mongoose from "mongoose";

const mainTodoSchema = mongoose.Schema(
  {
    todoHead: {
      type: String,
      required: true,
      minlength: 3, // Minimum length (optional)
    },
    color: {
      type: String,
      default: "blue",
    },
    TodosCompleted: {
      type: Boolean,
      default: false,
    },
    todoImg: {
      type: String,
    },
    subTodo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTodo"
    }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

// Create a unique index for todoHead per user
mainTodoSchema.index({ todoHead: 1, createdBy: 1 }, { unique: true });

export const MainTodo = mongoose.model("MainTodo", mainTodoSchema);
