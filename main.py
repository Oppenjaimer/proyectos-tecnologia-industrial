#!/usr/bin/python3

from charmaps import *
import subprocess
import argparse
import sys

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


def parse_args() -> argparse.Namespace:
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


def translit(text: str, charmap: dict[str, str]) -> str:
    for i in charmap.keys():
        text = text.replace(i, charmap[i])
        text = text.replace(i.upper(), charmap[i].upper())

    return text


def copy(text: str):
    try:
        import pyperclip
        pyperclip.copy(text)
    except ImportError:
        if sys.platform == "linux":
            command = "xsel -bi"
        elif sys.platform == "win32":
            command = "utf8clip"
        elif sys.platform == "darwin":
            command = "pbcopy"

        try:
            subprocess.run(command.split(), universal_newlines=True, check=True, input=text)
        except:
            print("translit: warning: unable to copy transliteration to clipboard")


def main():
    args = vars(parse_args())
    text, lang, no_copy, charmap = args.values()

    if charmap is not None:
        print(f"{charmaps[charmap][0]}\n{'-' * len(charmaps[charmap][0])}")

        items = charmaps[charmap][1].items()
        max_length = max(len(i[0]) for i in items) + 2
        for k, v in items:
            print(k.ljust(max_length) + v)

    text = translit(" ".join(text), charmaps[lang][1])

    if len(text) > 0:
        print(text)

    if not no_copy:
        copy(text)


if __name__ == "__main__":
    main()
