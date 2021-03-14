import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import Post from './models/Post';

const routes = Router();

routes.get('/posts', async (req, res) => {
  const posts = await Post.find();

  return res.json(posts);
});

routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, key, filename, location: url = "" } = req.file;
  const post = await Post.create({
    name,
    size,
    key: filename || key,
    url,
  });

  return res.json(post);
});

routes.delete('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).send({
      message: 'Post not found.'
    });
  }

  await post.remove();

  return res.send();
});


export default routes;