import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { backend } from 'declarations/backend';
import PostList from './components/PostList';
import NewPostModal from './components/NewPostModal';

interface Post {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleCreatePost = async (title: string, body: string, author: string) => {
    try {
      const result = await backend.createPost(title, body, author);
      if ('ok' in result) {
        await fetchPosts();
        setModalOpen(false);
      } else {
        console.error('Error creating post:', result.err);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Crypto Blog
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
        >
          New Post
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <PostList posts={posts} />
      )}
      <NewPostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </Container>
  );
}

export default App;
