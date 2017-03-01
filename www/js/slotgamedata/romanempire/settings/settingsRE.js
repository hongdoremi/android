/**
 * Created by Duy on 7/6/2016.
 */
/**
 * THIS CLASS ALL SETTING VALUES FOR GAME
 * @constructor
 */
function SettingsRE() {


    this.CANVAS_WIDTH = 1920;
    this.CANVAS_HEIGHT = 1080;

    this.FPS_TIME = 1000 / 30;
    this.DISABLE_SOUND_MOBILE = false;

    this.BONUS_TYPE_DOUBLE_UP = 1;
    this.BONUS_TYPE_FREESPIN = 2;
    this.BONUS_TYPE_FS_WITH_TRIGGER = 3;

    this.STATE_LOADING = 0;
    this.STATE_MENU = 1;
    this.STATE_HELP = 1;
    this.STATE_PREPARE = 2;
    this.STATE_GAME = 3;

    this.GAME_STATE_IDLE = 0;
    this.GAME_STATE_SPINNING = 1;
    this.GAME_STATE_SHOW_ALL_WIN = 2;
    this.GAME_STATE_SHOW_WIN = 3;
    this.GAME_STATE_BONUS = 4;

    this.REEL_STATE_START = 0;
    this.REEL_STATE_MOVING = 1;
    this.REEL_STATE_STOP = 2;

    this.SPIN_BUT_STATE_SPIN = "spin";
    this.SPIN_BUT_STATE_STOP = "stop";
    this.SPIN_BUT_STATE_AUTOSPIN = "autospin";
    this.SPIN_BUT_STATE_DISABLE = "disable";
    this.SPIN_BUT_STATE_SKIP = "skip";

    this.ON_MOUSE_DOWN = 0;
    this.ON_MOUSE_UP = 1;
    this.ON_MOUSE_OVER = 2;
    this.ON_MOUSE_OUT = 3;
    this.ON_DRAG_START = 4;
    this.ON_DRAG_END = 5;

    this.SCALE_ENTIRE_REEL = 1.2;
    this.REEL_OFFSET_X = 378;
    this.REEL_OFFSET_Y = 213;

    this.NUM_REELS = 5;
    this.NUM_ROWS = 3;
    this.NUM_SYMBOLS = 13;

    this.FREESPIN_SYMBOL = 11;


    this.SCATTER_SYMBOL = 11;
    this.WILD_SYMBOL = 12;
    this.WILD_EXPANDED = 100;


    this.JACKPOT_SYMBOL = 15;
    this.NUM_PAYLINES = 30;
    this.SYMBOL_WIDTH = 215;
    this.SYMBOL_HEIGHT = 206;
    this.SYMBOL_WIDTH_WINANIMATION = 198;
    this.SYMBOL_HEIGHT_WINANIMATION = 191;
    this.SYMBOL_WIDTH_ANIMATE = 390;
    this.SYMBOL_HEIGHT_ANIMATE = 400;

    this.SPACE_BETWEEN_SYMBOLS = 19;
    this.SPACE_HEIGHT_BETWEEN_SYMBOLS = 4;

    this.MAX_FRAMES_REEL_EASE = 8;
    this.MIN_REEL_LOOPS;
    this.REEL_DELAY;

    this.WIDTH_REEL = (this.SYMBOL_WIDTH + this.SPACE_BETWEEN_SYMBOLS) * (this.NUM_REELS);
    this.HEIGHT_REEL = (this.SYMBOL_HEIGHT + this.SPACE_HEIGHT_BETWEEN_SYMBOLS) * (this.NUM_ROWS);

    this.REEL_START_Y = this.REEL_OFFSET_Y - this.HEIGHT_REEL;
    this.REEL_ARRIVAL_Y = this.REEL_OFFSET_Y +this.HEIGHT_REEL;

    this.TIME_SHOW_WIN;
    this.TIME_SHOW_ALL_WINS;
    this.TIME_SPIN_BUT_CHANGE = 1000;
    this.NUM_INFO_PAGES = 4;
    this.TIME_HOLD_AUTOSPIN = 1000;
    this.SWIPE_THRESHOLD = 220;
    this.ANIM_SYMBOL_STEPS = 3;
    this.TIME_REFRESH_JACKPOT = 300000;

    this.SCALE_SYMBOL_MAX = 1.5;
    this.SCALE_SYMBOL_MIN = 1;//0.7;
    this.SCALE_SYMBOL = 1;
    this.FPS = 30;

    this.totalWinTextSize = "80px Skater-Girls-Rock";
    this.spaceVerticalTextTotalWin = 20;
    this.yPositionTextTotalWin = this.CANVAS_HEIGHT * 0.5;


    this.IS_DISABLE_ALL_BUTTON = false;
    this.IS_PLAYING_WIN_PANEL = false;

    this.IS_ENGLISH = true;
//this.IS_ENGLISH = false;
    this.selectLanguage;

    this.TIMER_INTERVAL_WIN_PANEL = 50;
    this.TIMER_RUN_ANIMATION_TEXT_WIN_PANNEL = 2500;
    this.TIMER_WAITING_TEXT_WIN_PANEL = 2000;
    this.TIMER_RUN_ANIMATION_TEXT_WIN_PANNEL_FAST = 1000;
    this.TIMER_WAITING_TEXT_WIN_PANEL_FAST = 7000;
    this.TIMER_ANIMATION_WIN_PANEL = 8000;
}