const Blog = require("../models/Blog");
const User = require("../models/User");
const uploadImage = require("../utils/uploadImage"); // Utility for image uploads

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const userEmail = req.user?.email; // Extract email from authenticated user
    if (!userEmail) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ error: "User not found" });

    let imageUrl = "";
    if (req.file) {
      imageUrl = await uploadImage(req.file); // Handle image upload
    }

    const newBlog = new Blog({
      title: req.body.title,
      content: req.body.content,
      imageUrl,
      author: userEmail,
      authorId: user._id,
    });

    const savedBlog = await newBlog.save();
    await User.findByIdAndUpdate(user._id, {
      $push: { contributions: savedBlog._id },
    });

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: savedBlog });
  } catch (error) {
    res.status(500).json({ error: "Error saving blog" });
  }
};

// Get All Blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Fetch all blogs in descending order
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
};

// Get Blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blog" });
  }
};

// Update Blog (Only Author)
exports.updateBlog = async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) return res.status(401).json({ error: "Unauthorized" });

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: userEmail },
      {
        title: req.body.title,
        content: req.body.content,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedBlog)
      return res
        .status(403)
        .json({ error: "Permission denied or blog not found" });

    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ error: "Error updating blog" });
  }
};

// Delete Blog (Only Author)
exports.deleteBlog = async (req, res) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) return res.status(401).json({ error: "Unauthorized" });

    const deletedBlog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: userEmail,
    });
    if (!deletedBlog)
      return res
        .status(403)
        .json({ error: "Permission denied or blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting blog" });
  }
};
