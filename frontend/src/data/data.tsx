// /data/data.tsx

export const dummyForums = [
    {
      id: 1,
      title: 'First Forum Post',
      content: 'Full content of the forum post...',
      likes: 5,
      comments: [
        {
          id: 1,
          author: 'Alice',
          content: 'Nice post!',
          likes: 3,
          replies: [
            { id: 1, author: 'Bob', content: 'Totally agree!', likes: 1 }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Second Forum Post',
      content: 'Here’s some more content to discuss.',
      likes: 2,
      comments: [
        {
          id: 1,
          author: 'Charlie',
          content: 'I have thoughts!',
          likes: 1,
          replies: []
        }
      ]
    }
  ];
  