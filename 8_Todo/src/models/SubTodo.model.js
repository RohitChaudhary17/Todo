import mongoose from "mongoose";

const subTodoSchema = mongoose.Schema(
  {
    subTodoHead: {
      type: String,
      required: true,
    },

    description:{
      type: String,
    },

    completed:{
      type:Boolean,
      default:false,
    },

    dueDate: { 
      type: Date,
      required:true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    belongTo:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"MainTodo"
    },


  },
  { timestamps: true }
);

export const SubTodo = mongoose.model("SubTodo", subTodoSchema);
