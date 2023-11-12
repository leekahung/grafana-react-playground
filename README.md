# grafana-react-playground

Readme for Grafana/Docker configuations under grafana-panel-test

Readme for Vite/React under grafana-front-end-integration

Currently messing with:

- Frontend

  - React (served in port 5173)
  - Tailwindcss

- Backend

  - Docker (served in port 35729)
  - Grafana (served in port 3000)

Grafana panels could be customized from `grafana/panel-test/src/components/SimplePanel.tsx` and embedded to React frontend via `<iframe>`. `<iframe>` could be labeled with aria-label for accessibility.
