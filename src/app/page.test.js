import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Home from './page.js';

jest.mock('../../components/CardList/CardList', () => {
  return ({ posts }) => (
    <div>
      {posts.map((post, index) => (
        <div key={index}>{post.title}</div>
      ))}
    </div>
  );
});

global.fetch = jest.fn();

describe('Home Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('displays a loading message initially', () => {
    render(<Home />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays posts after successful fetch', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ posts: [{ title: 'Post 1' }, { title: 'Post 2' }] }),
    });

    render(<Home />);

    await waitFor(() => expect(screen.getByText('Post 1')).toBeInTheDocument());
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('displays an error message if the fetch fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Failed to fetch posts' }),
    });

    render(<Home />);

    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    expect(screen.getByText(/Failed to fetch posts/i)).toBeInTheDocument();
  });

  it('displays an error message if the fetch throws an error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Home />);

    await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    expect(screen.getByText(/Network error/i)).toBeInTheDocument();
  });

  it('fetches posts with the correct userID from the URL parameters', async () => {
    const mockPosts = { posts: [{ title: 'User Post 1' }] };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    window.history.pushState({}, '', '/?userID=123');

    render(<Home />);

    await waitFor(() => expect(screen.getByText('User Post 1')).toBeInTheDocument());
  });
});
