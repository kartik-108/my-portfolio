import { useCallback, useEffect, useRef, useState } from 'react';

const AUDIO_SRC = '/audio/evolving-horizons.mp3';
const STORAGE_KEY = 'portfolio-sound-enabled';
const TARGET_VOLUME = 0.42;
const FADE_MS = 900;

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const stopTimerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const cancelFade = useCallback(() => {
    if (fadeFrameRef.current !== null) {
      cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  }, []);

  const fadeVolume = useCallback(
    (target: number, duration = FADE_MS) => {
      const audio = audioRef.current;
      if (!audio) return;

      cancelFade();

      const start = audio.volume;
      const delta = target - start;
      if (Math.abs(delta) < 0.01) {
        audio.volume = target;
        return;
      }

      const startedAt = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        audio.volume = Math.min(1, Math.max(0, start + delta * eased));

        if (progress < 1) {
          fadeFrameRef.current = requestAnimationFrame(tick);
        } else {
          fadeFrameRef.current = null;
          audio.volume = target;
        }
      };

      fadeFrameRef.current = requestAnimationFrame(tick);
    },
    [cancelFade]
  );

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;

    cancelFade();
    if (stopTimerRef.current !== null) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
    audio.volume = 0;

    try {
      await audio.play();
      setIsPlaying(true);
      fadeVolume(TARGET_VOLUME);
      return true;
    } catch {
      audio.pause();
      audio.volume = 0;
      setIsPlaying(false);
      return false;
    }
  }, [cancelFade, fadeVolume]);

  const stopPlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsPlaying(false);
    fadeVolume(0);

    stopTimerRef.current = window.setTimeout(() => {
      stopTimerRef.current = null;
      if (audioRef.current === audio && !audio.paused) audio.pause();
    }, FADE_MS + 40);
  }, [fadeVolume]);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      localStorage.setItem(STORAGE_KEY, 'false');
      stopPlayback();
      return;
    }

    void startPlayback().then((started) => {
      if (started) localStorage.setItem(STORAGE_KEY, 'true');
    });
  }, [isPlaying, startPlayback, stopPlayback]);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;
    audioRef.current = audio;

    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      // A browser may reject this until the user interacts with the page.
      // If that happens, the sound button remains available for manual start.
      void startPlayback().then((started) => {
        if (!started) setIsPlaying(false);
      });
    }

    return () => {
      cancelFade();
      if (stopTimerRef.current !== null) {
        window.clearTimeout(stopTimerRef.current);
        stopTimerRef.current = null;
      }
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [cancelFade, startPlayback]);

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-pressed={isPlaying}
      aria-label={isPlaying ? 'Turn portfolio sound off' : 'Turn portfolio sound on'}
      title={isPlaying ? 'Turn portfolio sound off' : 'Turn portfolio sound on'}
      data-cursor-grow
      className="music-control brutal-border fixed bottom-5 right-5 z-[70] flex items-center gap-3 bg-[var(--color-ink)]/95 px-3 py-2 backdrop-blur-sm transition-colors hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)] md:bottom-7 md:right-7"
    >
      <span className="music-bars" aria-hidden>
        <span />
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="mono-font text-[10px] font-bold uppercase tracking-[0.18em]">
        Sound {isPlaying ? 'On' : 'Off'}
      </span>
    </button>
  );
}
