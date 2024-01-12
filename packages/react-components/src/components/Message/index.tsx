import React, {
  createRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import styled from '@emotion/styled';
import { animated, useTransition } from '@react-spring/web';

type IRef = {
  add: (options: IMessage) => void;
  clear: () => void;
};
type IMessageType = 'info' | 'warn' | 'warning' | 'success' | 'error';
type IMessage = {
  id: number;
  msg: string;
  type: IMessageType;
  duration: number;
};

const StyledNotice = styled.div<{ type: IMessageType }>`
  padding: 8px 16px;
  margin-bottom: 16px;
  pointer-events: all;
  background-color: #fff;
  border-left: 4px solid transparent;
  border-left-color: ${({ type }) => {
    switch (type) {
      case 'info':
        return '#1890ff';
      case 'success':
        return '#52c41a';
      case 'error':
        return '#ff4d4f';
      case 'warn':
      case 'warning':
        return '#faad14';
      default:
        return '#0ff';
    }
  }};
  box-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
`;
const Notice: React.FC<IMessage & { onClose: () => void }> = ({
  id,
  msg,
  type,
  duration,
  onClose,
  ...props
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <StyledNotice type={type} {...props}>
      {msg}
    </StyledNotice>
  );
};

const AnimatedNotice = animated(Notice);

const StyledContainer = styled.div`
  position: fixed;
  top: 8px;
  left: 50%;
  z-index: 9999;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-size: 14px;
  pointer-events: none;
  transform: translateX(-50%);
`;
const Container = forwardRef((props, ref) => {
  const [msgs, setMsgs] = useState<IMessage[]>([]);
  const add = (opt: IMessage) => {
    setMsgs((prev) => [...prev, opt]);
  };
  const clear = () => {
    setMsgs([]);
  };
  const onRemove = (id: number) => {
    setMsgs((prevMsgs) => prevMsgs.filter((msg) => msg.id !== id));
  };
  useImperativeHandle(ref, () => ({
    add,
    clear,
  }));
  const transitions = useTransition(msgs, {
    from: { transform: 'translateY(-100%)', opacity: 0 },
    enter: { transform: 'translateY(0%)', opacity: 1 },
    leave: { transform: 'translateY(-100%)', opacity: 0 },
  });
  return (
    <StyledContainer>
      {transitions((style, item) => (
        <AnimatedNotice
          style={style}
          {...item}
          onClose={() => onRemove(item.id)}
        />
      ))}
    </StyledContainer>
  );
});

export class Message {
  private static ref: React.RefObject<IRef> = createRef<IRef>();
  private static key = 0;

  static duration = 2000;
  static add(type: IMessageType, msg: string, duration = Message.duration) {
    if (!Message.ref.current) {
      const root = createRoot(document.createElement('div'));
      root.render(createPortal(<Container ref={Message.ref} />, document.body));

      setTimeout(() => {
        Message.ref.current?.add({
          id: Message.key++,
          msg,
          type,
          duration,
        });
      });
      return;
    }
    Message.ref.current?.add({
      id: Message.key++,
      msg,
      type,
      duration,
    });
  }
  static clear() {
    Message.ref.current?.clear();
  }

  static info(msg: string, duration?: number) {
    Message.add('info', msg, duration);
  }
  static success(msg: string, duration?: number) {
    Message.add('success', msg, duration);
  }
  static warn(msg: string, duration?: number) {
    Message.add('warn', msg, duration);
  }
  static warning(msg: string, duration?: number) {
    Message.add('warn', msg, duration);
  }
  static error(msg: string, duration?: number) {
    Message.add('error', msg, duration);
  }
}
