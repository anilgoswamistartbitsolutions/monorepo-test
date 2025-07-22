// "use client"
import React from 'react'
import BlogCard from '@/components/SharedComponent/Blog/blogCard'
import { getAllPosts } from '@/utils/markdown'

// import { apiCall } from '@/utils/apiCall';


const BlogList: React.FC = () => {
  const posts = getAllPosts(['title', 'date', 'excerpt', 'coverImage', 'slug'])

  // async function fetchBlogs() {
  //   const data = await apiCall({
  //     url: '/blog'
  //   });

  //   return data.docs;
  // }


  // const data = fetchBlogs()

  return (
    <section
      className='flex flex-wrap justify-center pt-8 pb-0 dark:bg-darkmode'
      id='blog'>
      <div className='container mx-auto max-w-6xl lg:px-0 px-4'>
        <div className='grid grid-cols-12 gap-7'>
          {posts.map((blog, i) => (
            <div
              key={i}
              className='w-full lg:col-span-4 md:col-span-6 col-span-12'>
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BlogList
