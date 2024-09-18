import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeCard from "../components/HomeCard";
import { getPostAction } from '../redux/actions/post';

const Home = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(getPostAction()); // Sayfa yüklendiğinde postları getir
    }, [dispatch]);

    return (
        <div className='flex items-center m-5 gap-5 flex-wrap'>
            {
                posts && posts.map((post, i) => (
                    <HomeCard key={i} post={post} />
                ))
            }
        </div>
    );
};

export default Home;
