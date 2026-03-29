import dom from './dom.js';
import { callApi } from './api.js';
import { printResult } from './ui.js';

function buildMusicRequest(method, title, file) {
  const hasFile = file && file.size > 0;

  if (hasFile) {
    const body = new FormData();
    if (title) {
      body.append('title', title);
    }
    body.append('file', file);
    return { method, body };
  }

  return {
    method,
    body: JSON.stringify({ title: title || undefined })
  };
}

export function bindMusicEvents() {
  dom.createMusicForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(dom.createMusicForm);

    try {
      const data = await callApi('/music', buildMusicRequest('POST', form.get('title'), form.get('file')));
      printResult('Create music success', data);
    } catch (error) {
      printResult('Create music failed', error, true);
    }
  });

  dom.updateMusicForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(dom.updateMusicForm);
    const id = form.get('id');

    try {
      const data = await callApi(`/music/${id}`, buildMusicRequest('PUT', form.get('title'), form.get('file')));
      printResult('Update music success', data);
    } catch (error) {
      printResult('Update music failed', error, true);
    }
  });

  dom.deleteMusicForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(dom.deleteMusicForm);

    try {
      const data = await callApi(`/music/${form.get('id')}`, { method: 'DELETE' });
      printResult('Delete music success', data);
    } catch (error) {
      printResult('Delete music failed', error, true);
    }
  });

  dom.listMusicBtn.addEventListener('click', async () => {
    try {
      const data = await callApi('/music');
      printResult('List music success', data);
    } catch (error) {
      printResult('List music failed', error, true);
    }
  });
}
