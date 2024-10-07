export interface TarjetaProps {
    card: {
      id_card: string;
      title_card: string;
    };
    index: number;
    constrainsTask: any;
    cardRefs: React.MutableRefObject<any[]>;
    getCards: () => void;
  }