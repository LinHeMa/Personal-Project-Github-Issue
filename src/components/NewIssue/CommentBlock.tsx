import {
  ArrowDownIcon,
  KebabHorizontalIcon,
  SmileyIcon,
  TriangleDownIcon,
} from '@primer/octicons-react';
import MDEditor from '@uiw/react-md-editor';
import clsx from 'clsx';
import _ from 'lodash';
import React from 'react';
import {
  Comment,
  Comment as commentType,
  Reactions,
} from '../../utils/type/commentsType';
import { timeCalc } from '../IssuePage/Item';
import Emoji from './Emoji';

const CommentBlock = ({
  body,
  user,
  created_at,
  updated_at,
  author_association,
  reactions,
}: commentType) => {
  const turnNormalCase = _.flow([_.lowerCase, _.upperFirst]);
  const turnReactionsToArray = (obj: Reactions) => {
    const array = [];
    for (const [key, value] of Object.entries(obj)) {
      if (key !== 'url' && key !== 'total_count' && value !== 0) {
        array.push(
          <Emoji type={key} number={value} key={key + _.toString(value)} />,
        );
      }
    }
    return array;
  };
  return (
    <div className='flex'>
      <img
        src={user?.avatar_url}
        className={`mr-[16px] hidden h-[40px]  w-[40px] rounded-full md:block`}
      />
      <div className=' relative w-full pb-[32px]  after:absolute after:top-0 after:left-[20px] after:-z-10 after:h-full after:border after:border-solid after:border-[#D8DEE3]'>
        <div
          className={`flex  items-center justify-between whitespace-pre rounded-t-lg border border-b-0   border-solid border-stone-300 bg-[#F6F8FA] py-[12px] px-[18px] text-[14px] text-[#57606A] md:rounded-t-xl ${clsx(
            {
              'bg-[#DDF4FF]': author_association === 'OWNER',
              'bg-[#F6F8FA]': author_association !== 'OWNER',
            },
          )}`}
        >
          <div className='flex flex-wrap'>
            <span className='font-semibold'>{user?.login}</span> commented{' '}
            {timeCalc(created_at as string)} •{' '}
            {updated_at ? (
              <span className='cursor-pointer'>
                edited <TriangleDownIcon />
              </span>
            ) : (
              ''
            )}
          </div>
          <div className='flex items-center'>
            <div className='mr-4 hidden rounded-[2em] border border-solid border-stone-300 px-[7px] py-[4px] text-[12px] font-medium sm:block'>
              {turnNormalCase(author_association)}
            </div>
            {author_association === 'OWNER' && (
              <div className='mr-4 hidden rounded-[2em] border border-solid border-stone-300 px-[7px] py-[4px] text-[12px] font-medium sm:block'>
                Author
              </div>
            )}
            <div className=' mr-4 hidden h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full md:flex'>
              <SmileyIcon size={16} />
            </div>
            <span className='cursor-pointer'>
              <KebabHorizontalIcon />
            </span>
          </div>
        </div>
        <div className='rounded-b-lg border border-solid border-stone-300 bg-white p-[16px] md:rounded-b-xl'>
          <div data-color-mode='light' className='mt-8'>
            <div className='wmde-markdown-var'>
              <MDEditor.Markdown
                source={body}
                style={{ whiteSpace: 'pre-wrap' }}
              />
            </div>
            <div className='mt-4 flex'>
              {!_.isEmpty(turnReactionsToArray(reactions!)) && (
                <div className=' mr-2 flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-solid border-stone-300 bg-[#F3F4F6]'>
                  <SmileyIcon size={16} />
                </div>
              )}
              <div className='flex flex-wrap'>
                {turnReactionsToArray(reactions!)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentBlock;