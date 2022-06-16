# -*- coding: utf-8 -*-
"""
Created on Tue Jun  7 17:23:28 2022

@author: VIHAAN KATHURIA
"""

from tkinter import *
from PIL import ImageTk, Image
from tkinter import filedialog
from tkinter import messagebox

import webbrowser
import os

root = Tk()
root.minsize(650,650)
root.maxsize(650,650)

open_img = ImageTk.PhotoImage(Image.open("Open.png"))
save_img = ImageTk.PhotoImage(Image.open("save.png"))
play_img = ImageTk.PhotoImage(Image.open("Play.png"))

label_file_name = Label(root,text = "File Name")
label_file_name.place(relx = 0.3, rely = 0.05, anchor = CENTER)

input_file_name = Entry(root)
input_file_name.place(relx = 0.5, rely = 0.05, anchor = CENTER)

my_text = Text(root, height = 30, width = 70,bg = "CadetBlue3",borderwidth = 5,relief = "ridge")
my_text.place(relx = 0.5, rely = 0.5, anchor = CENTER)

name = ""

def openfile():
    print("Open Button")
    global name
    my_text.delete(1.0,END)
    input_file_name.delete(0,END)
    text_file = filedialog.askopenfilename(title = "Open .html file",filetypes = (("Html Files","*.html"),))
    print(text_file)
    name = os.path.basename(text_file)
    formated_name = name.split('.')[0]
    print(formated_name)    
    input_file_name.insert(END,formated_name)
    root.title(formated_name)
    text_file = open(name,'r')
    paragraph = text_file.read()
    my_text.insert(END,paragraph)
    text_file.close()

def savefile():
    print("Save Button")
    input_name = input_file_name.get()
    print(input_name)
    file = open(input_name + ".html","w")
    data = my_text.get("1.0",END)
    print(data)
    file.write(data)
    input_file_name.delete(0,END)
    my_text.delete(1.0,END)
    messagebox.showinfo("Update","Successfull")

def playfile():
    print("Play Button")
    global name
    webbrowser.open(name)

open_btn = Button(root, image = open_img, command = openfile)
open_btn.place(relx = 0.1, rely = 0.05, anchor = CENTER)

save_btn = Button(root, image = save_img, command = savefile)
save_btn.place(relx = 0.15, rely = 0.05, anchor = CENTER)

play_btn = Button(root, image = play_img, command = playfile)
play_btn.place(relx = 0.2, rely = 0.05, anchor = CENTER)


root.mainloop()