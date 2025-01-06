import { Link } from 'wouter';
import { cx } from 'yummies/css';

import { StatusCodeShortData } from '@/entities/status-codes/model';
import { useRootStore } from '@/shared/lib/mobx/root-store';

export const StatusCodeCard = ({
  data,
  className,
}: {
  data: StatusCodeShortData;
  className?: string;
}) => {
  const { router } = useRootStore();

  return (
    <Link
      href={`/${data.code}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        router.navigate(`/${data.code}`);
      }}
      className={cx(
        'flex flex-col h-auto w-[240px] max-sm:max-w-full aspect-square',
        className,
      )}
    >
      <div
        className={
          'bg-base-100 rounded-md flex flex-col relative border border-base-content/50 size-full'
        }
      >
        {data.image && (
          <img
            src={`${buildEnvs.BASE_URL || ''}${data.image}`}
            alt={''}
            className={
              'size-full border-none object-cover rounded-[inherit] absolute inset-0'
            }
          />
        )}
        <div
          className={
            'relative flex flex-col px-2 font-mono py-1 rounded-bl-[inherit] rounded-br-[inherit] -mb-px bg-base-300/15 border border-x-0 border-base-content/50 backdrop-blur-md mt-auto'
          }
        >
          <h2 className={'prose font-semibold text-lg'}>{data.code}</h2>
          <p className={'truncate'}>{data.title}</p>
        </div>
      </div>
    </Link>
  );
};
