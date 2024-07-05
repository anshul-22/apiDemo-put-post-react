// src/ApiComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, CircularProgress, Card, CardContent } from '@mui/material';

const ApiComponent = () => {
  const [postData, setPostData] = useState({ title: '', body: '' });
  const [putData, setPutData] = useState({ id: '', title: '', body: '' });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePostChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handlePutChange = (e) => {
    setPutData({ ...putData, [e.target.name]: e.target.value });
  };

  const handlePost = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', postData);
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePut = async () => {
    // Validate ID
    if (!putData.id || isNaN(putData.id)) {
      setError('ID must be a valid number');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await axios.put(`https://jsonplaceholder.typicode.com/posts/${putData.id}`, {
        title: putData.title,
        body: putData.body,
        id: putData.id, // Include ID in the request body
      });
      setResponse(res.data);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data}`);
      } else if (err.request) {
        setError('No response received from server.');
      } else {
        setError(`Request error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        API Demo
      </Typography>

      <Card style={{ marginBottom: '1rem' }}>
        <CardContent>
          <Typography variant="h6">Post API</Typography>
          <TextField
            label="Title"
            name="title"
            value={postData.title}
            onChange={handlePostChange}
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Body"
            name="body"
            value={postData.body}
            onChange={handlePostChange}
            fullWidth
            multiline
            rows={4}
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="contained" color="primary" onClick={handlePost} fullWidth>
            Submit Post
          </Button>
        </CardContent>
      </Card>

      <Card style={{ marginBottom: '1rem' }}>
        <CardContent>
          <Typography variant="h6">Put API</Typography>
          <TextField
            label="ID"
            name="id"
            value={putData.id}
            onChange={handlePutChange}
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Title"
            name="title"
            value={putData.title}
            onChange={handlePutChange}
            fullWidth
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Body"
            name="body"
            value={putData.body}
            onChange={handlePutChange}
            fullWidth
            multiline
            rows={4}
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="contained" color="primary" onClick={handlePut} fullWidth>
            Update Post
          </Button>
        </CardContent>
      </Card>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <CircularProgress />
        </div>
      )}
      {error && (
        <Typography color="error" variant="body1" style={{ marginTop: '1rem' }}>
          {error}
        </Typography>
      )}
      {response && (
        <Card style={{ marginTop: '1rem' }}>
          <CardContent>
            <Typography variant="h6">Response</Typography>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ApiComponent;
