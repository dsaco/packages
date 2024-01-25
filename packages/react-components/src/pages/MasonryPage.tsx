import { Masonry } from '@/components/Masonry';
import React, { HTMLProps, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { debounce, throttle } from 'lodash';

type ItemProps = {
  idx: string;
  height: string | number;
};

const Item: React.FC<ItemProps> = ({ idx, height, ...props }) => {
  return (
    <div style={{ height }} {...props}>
      {idx}
    </div>
  );
};

const StyledItem = styled.div`
  position: relative;
`;
export const MasonryItem: React.FC<
  {
    height: number;
    children?: React.ReactNode;
  } & HTMLProps<Element>
> = ({ children, height }) => {
  return (
    <div>{React.cloneElement(children as React.ReactElement, { height })}</div>
  );
};

type Joke = {
  id: number;
  type: number;
  content: string;
  createTime: string;
  updateTime: string;
  author: {
    id: number;
    name: string;
  };
};
const JokeCard: React.FC<Joke> = ({ content }) => {
  return (
    <div style={{ boxShadow: '0 0 15px #aaa', padding: 16, borderRadius: 6 }}>
      {content}
    </div>
  );
};

export default function () {
  const PAGE_SIZE = 10;

  const [list, setList] = useState<Joke[]>([]);
  const [timeStamp, setTimeStamp] = useState<string>();
  useEffect(() => {
    setList([
      {
        id: 3,
        type: 0,
        content:
          '话说悟空枕着金箍棒睡着了，醒来发现自己的金箍棒不见了，大圣就想是不是滚到附近去了，急忙叫出土地。问道“土地，我的金箍棒在哪？”\n土地一看大圣，颤抖着说“大圣，你的金箍，棒就棒在特别符合你的发型。”',
        createTime: '2020-04-23T11:20:36',
        updateTime: '2020-11-28T19:59:36',
        author: {
          id: 2,
          name: '小黑',
        },
      },
      {
        id: 4,
        type: 0,
        content:
          '刚拔完智齿我没法说话\n到楼下商店在手机上打字想买一支笔\n老板问我怎么了我口齿不清的给他说我拔牙了\n然后老板手脚并用的给我比划出五块五来\n我说我就是拔牙了我耳朵没事',
        createTime: '2020-04-11T21:58:58',
        updateTime: '2020-06-11T22:08:32',
        author: {
          id: 2,
          name: '小黑',
        },
      },
      {
        id: 5,
        type: 0,
        content:
          '在地铁上看恐怖片预感有个恐怖的画面就把手机对着另一边然后旁边的男的看着我的手机尖叫了。。。',
        createTime: '2020-04-11T21:58:57',
        updateTime: '2020-06-11T22:08:32',
        author: {
          id: 2,
          name: '小黑',
        },
      },
      {
        id: 6,
        type: 0,
        content:
          '和朋友一起去搓一顿，商量好了大家AA，饭后，我拿出一半的饭钱，然后眼睁睁看着他拿出一张5折优惠券。',
        createTime: '2020-04-11T21:58:56',
        updateTime: '2020-06-11T22:08:32',
        author: {
          id: 2,
          name: '小黑',
        },
      },
      {
        id: 7,
        type: 0,
        content:
          '一大爷，咳嗽厉害，让大夫给看看。\n大夫说：回去少抽点烟吧。\n回去一个多月大爷又来找大夫了，咳嗽更厉害了。\n大夫就问：让你少抽点烟，你抽多少啊？\n大爷说：一天不到半盒啊。\n大夫又问：那你以前抽多少啊？\n大爷说：以前我不会抽啊……',
        createTime: '2020-04-11T21:58:55',
        updateTime: '2020-06-11T22:08:32',
        author: {
          id: 2,
          name: '小黑',
        },
      },
      {
        id: 8,
        type: 0,
        content:
          '女友出差，把她的狗狗放我这里几天，回来后问我：狗狗呢？我装作若无其事地说：送人了。看着女友那种快要急出眼泪的表情，瞬间心理乐了。然后笑嘻嘻地端来一锅肉对她说：骗你的，都在锅里呢。',
        createTime: '2020-04-11T21:58:54',
        updateTime: '2020-06-11T22:08:32',
        author: {
          id: 2,
          name: '小黑',
        },
      },
      {
        id: 9,
        type: 0,
        content:
          '猪吃泔水，结果被‘’动物保护协会‘’罚款了一万元……虐待动物。于是农民改喂大米饭，结果被‘’慈善者协会‘’罚款了一万元……浪费粮食。农民没办法，改喂猪吃天山雪莲，结果被‘’环境保护者协会‘’罚款了一万元……破坏稀有珍奇植物。过些日子领导又去视察，问农民现在喂猪吃的什么？农民答：喂啥呀？喂啥都他妈挨罚！现在我每天给它一百块钱，让自己出去吃！',
        createTime: '2020-04-11T21:58:53',
        updateTime: '2020-06-11T22:08:32',
        author: {
          id: 2,
          name: '小黑',
        },
      },
      {
        id: 10,
        type: 0,
        content:
          '化学家终于答应女友给她做顿晚饭。女友下班回来，却看到化学家还在摆弄他的烧瓶和酒精灯。看到女友失望的表情，化学家安慰说：“别着急亲爱的，再过5分钟盐就提炼出来了。”',
        createTime: '2020-04-11T21:58:52',
        updateTime: '2020-06-11T22:08:32',
        author: {
          id: 2,
          name: '小黑',
        },
      },
      {
        id: 11,
        type: 0,
        content:
          '邻居姑娘养的猫跳我家阳台顶棚上了，上不去下不来。 姑娘急的要命，打电话找消防队，结果消防队听说是只猫不肯来。 看姑娘伤心的样子我不忍心。 于是就自告奋勇爬上顶棚去帮她救猫。 事实证明只要猫咪和人一起困在顶棚上的话，消防队还是非常乐意救援的！',
        createTime: '2020-04-11T21:58:51',
        updateTime: '2020-06-11T22:08:32',
        author: {
          id: 2,
          name: '小黑',
        },
      },
      {
        id: 12,
        type: 0,
        content:
          '初中眼睛近视了但是不喜欢戴眼镜，有一天和小伙伴回家他们都叫叔叔好，我看不清楚也跟着叫叔叔好、他们惊讶的说“那不是你爸么”',
        createTime: '2020-04-11T21:57:59',
        updateTime: '2020-06-11T22:08:32',
        author: {
          id: 2,
          name: '小黑',
        },
      },
    ]);
    const fn1 = (e: Event) => {
      console.log('------------', Date.now());
      return 'f1';
    };
    const fn2 = (e: Event) => {
      console.log('            ==============', Date.now());
      return 'f2';
    };
    // const trailing = true;
    // const leading = true;
    // const f1 = debounce(fn1, 1000, { leading });
    // const f2 = deb(fn2, 1000, { leading });
    // const f1 = throttle(fn1, 500, { trailing });
    // const f2 = thr(fn2, 500, { trailing });
    // window.addEventListener('click', f1);
    // window.addEventListener('click', f2);
    // window.addEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* <button onClick={onclick}>add</button> */}
      <Masonry render={JokeCard} list={list} />
    </>
  );
}
