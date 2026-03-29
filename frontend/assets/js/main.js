import { bindAuthEvents, syncSessionOnLoad } from './auth.js';
import { bindMusicEvents } from './music.js';
import { bindAdminEvents } from './admin.js';

bindAuthEvents();
bindMusicEvents();
bindAdminEvents();
syncSessionOnLoad();
