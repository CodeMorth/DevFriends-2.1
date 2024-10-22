interface LoaderComponentProps {
    loading: boolean;
  }
  
export const LoaderComponent = ({ loading }: LoaderComponentProps) => {
    return loading ? (
      <div className="m-auto flex w-full items-center justify-center backdrop-blur-sm dark:bg-dark">
        <div className="h-16 w-16 animate-spin rounded-full border-10 border-solid border-primary border-t-transparent"></div>
      </div>
    ) : null;
  };
  
  