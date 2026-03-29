import dom from './dom.js';
import { callApi } from './api.js';
import { printResult } from './ui.js';

export function bindAdminEvents() {
  if (dom.confirmMusicForm) {
    dom.confirmMusicForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = new FormData(dom.confirmMusicForm);
      const musicId = form.get('musicId');

      try {
        const data = await callApi(`/music/admin/${musicId}/confirm`, { method: 'PATCH' });
        printResult('Confirm music success', data);
      } catch (error) {
        printResult('Confirm music failed', error, true);
      }
    });
  }

  if (dom.adminDeleteMusicForm) {
    dom.adminDeleteMusicForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const form = new FormData(dom.adminDeleteMusicForm);
      const musicId = form.get('musicId');

      try {
        const data = await callApi(`/music/admin/${musicId}`, { method: 'DELETE' });
        printResult('Admin delete music success', data);
      } catch (error) {
        printResult('Admin delete music failed', error, true);
      }
    });
  }

  if (dom.listAllMusicBtn) {
    dom.listAllMusicBtn.addEventListener('click', async () => {
      try {
        const data = await callApi('/music/admin/all');
        printResult('List all music success', data);
      } catch (error) {
        printResult('List all music failed', error, true);
      }
    });
  }
}
