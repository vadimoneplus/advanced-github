import React, {useEffect, useState} from 'react';
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../store/github/github.api";
import {useDebounce} from "../hooks/debounce";
import RepoCard from "../components/repoCard";

export const HomePage = () => {
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(true)
  const debounced = useDebounce(search)
  const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: false
  })
  const [fetchRepos, {isLoading: arrReposLoading, data: repos}] = useLazyGetUserReposQuery()
  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
  }, [debounced, data])
  const clickHandler = (userName: string) => {
    fetchRepos(userName)
    setDropdown(false)
  }

  return (
    <div className='flex justify-center mx-auto h-screen w-screen pt-10'>
      {isError && <p className='text-center text-red-500'>Error</p>}
      <div className="relative w-[560px]">
        <input
          type='text'
          className='border py-2 px-4 w-full h-[42px] mb-2'
          placeholder='Search for GitHub users'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        {dropdown &&
            <ul className='list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-scroll'>
              {isLoading && <p className='text-center'>Loading...</p>}
              {data?.map(user =>
                <li
                  key={user.id}
                  className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
                  onClick={() => clickHandler(user.login)}
                >
                  {user.login}
                </li>)}
            </ul>}
        <div className='container'>
          { arrReposLoading && <p className='text-center'>Repos are loading...</p> }
          { repos?.map(repo=> <RepoCard repo={repo} key={repo.id}/>) }
        </div>
      </div>
    </div>
  );
};

