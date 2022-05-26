from charmaps import *
import argparse

charmaps = {
    "ru": ("Russian", en_ru),
    "uk": ("Ukrainian", en_uk),
    "be": ("Belarusian", en_be),
    "bg": ("Bulgarian", en_bg),
    "mk": ("Macedonian", en_mk),
    "sc": ("Serbo-Croatian", en_sc)
}

epilog = """
supported languages:
  Russian (default)     ru
  Ukrainian             uk
  Belarusian            be
  Bulgarian             bg
  Macedonian            mk
  Serbo-Croatian        sc

The transliteration is copied to the clipboard by making use of the 'pyperclip' module. Should said module not be found, the following command-line tools will be used instead. If you get any warnings in this regard, check that the one your OS needs is installed and works correctly. Alternatively, you can always manually copy the output.
  Linux                 xsel
  Windows               utf8clip
  macOS                 pbcopy
"""

def parse_args():
    parser = argparse.ArgumentParser(prog="translit", add_help=False, formatter_class=argparse.RawDescriptionHelpFormatter, description="Transliterate Latin characters into Cyrillic ones.", epilog=epilog)
    parser.add_argument("text", nargs="*", help="original text to transliterate")
    parser.add_argument("-l", "--lang", default="ru", help="language to transliterate into")
    parser.add_argument("-n", "--no-copy", action="store_true", help="do not copy the transliteration to the clipboard")
    parser.add_argument("-c", "--charmap", help="show the language's transliteration table")
    parser.add_argument("-h", "--help", action="help", help="display this help and exit")
    parser.add_argument("-v", "--version", action="version", version="%(prog)s v1.0.0", help="output version information and exit")
    args = parser.parse_args()

    if args.lang not in charmaps.keys():
        parser.error(f"unsupported language: {args.lang}")
    
    if args.charmap is not None and args.charmap not in charmaps.keys():
        parser.error(f"unsupported language: {args.charmap}")
    
    if len(args.text) == 0 and args.charmap is None:
        parser.error("no text provided")
    
    return args
