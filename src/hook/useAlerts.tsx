'use client'

import { Toast } from 'primereact/toast';
import { useRef } from 'react'

export function useAlerts  () {
    const toast = useRef<Toast>(null);

    const show = (est:string) => {
      toast.current?.show({  detail:est, life: 1000});
    };

    return { show , toast}
}
