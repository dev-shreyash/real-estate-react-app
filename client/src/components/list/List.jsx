import Card from '../card/Card'
import './list.scss'

function List({ posts }) {
  console.log(posts);
  if (!Array.isArray(posts)) {
    return <p>No posts available.</p>;
  }
  return (
    <div className='list'>
      {posts.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}


export default List