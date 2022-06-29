import React, { useEffect, useRef, useState } from "react";
import PostService from "../API/PostService";
import { useFetching } from "../Components/hooks/useFetching";
import { useObserver } from "../Components/hooks/useObserver";
import { usePosts } from "../Components/hooks/usePost";
import PostFilter from "../Components/PostFilter";
import PostForm from "../Components/PostForm";
import PostList from "../Components/PostList";
import MyButton from "../Components/UI/button/MyButton";
import Loader from "../Components/UI/loader/Loader";
import MyModal from "../Components/UI/modal/MyModal";
import Pagination from "../Components/UI/pagination/pagination";
import MySelect from "../Components/UI/select/MySelect";
import { getPagesCount } from "../utils/pages";

function Posts() {
	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1)

	const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
		const response = await PostService.getAll(limit, page);
		setPosts([...posts, ...response.data])
		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPagesCount(totalCount, limit));
	})

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
	const lastElement = useRef();

	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1)
	})

	useEffect(() => {
		fetchPosts()
	}, [page, limit])

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	const changePage = (page) => {
		setPage(page);
	}

	return (
		<div className="App">
			<MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
				Создать пользователя
			</MyButton>
			<MyModal visible={modal} setVisible={setModal} >
				<PostForm create={createPost} />
			</MyModal>

			<hr style={{ margin: "15px 0" }}></hr>
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue="Кол-во поодгружаемых постов"
				options={[
					{ value: 5, name: '5' },
					{ value: 10, name: '10' },
					{ value: 25, name: '25' },
					{ value: -1, name: 'Все посты' }
				]}
			/>
			{postError && <h1>Произошла ошибка ${postError}</h1>}
			<PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Cписок постов'} />
			<div ref={lastElement} style={{ height: 20, background: 'hidden' }}></div>
			{isPostsLoading &&
				<div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}> <Loader /></div>
			}



			<Pagination
				page={page}
				changePage={changePage}
				totalPages={totalPages} />
		</div>
	);
}

export default Posts;