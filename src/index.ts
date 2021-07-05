import api from './api';

(function(): void {
  const port = process.env['PORT'] || '3000';

  api.listen(port, () => {
    console.log(`Listening on port ${ port }.`);
  });
})();
