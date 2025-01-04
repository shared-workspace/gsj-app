// Reference from https://github.com/gjsify/ts-for-gir/tree/main/examples

// Based on https://gitlab.gnome.org/GNOME/gjs/-/blob/master/examples/gtk-application.js

// SPDX-License-Identifier: MIT OR LGPL-2.0-or-later
// SPDX-FileCopyrightText: 2017 Andy Holmes <andrew.g.r.holmes@gmail.com>

import '@girs/gjs';
import '@girs/gjs/ambient';
import '@girs/gio-2.0';
import '@girs/glib-2.0';
import '@girs/gtk-4.0';

// See the note about Application.run() at the bottom of the script
import System from 'system';
import Gio from 'gi://Gio?version=2.0';
import GLib from 'gi://GLib?version=2.0';
import GObject from 'gi://GObject?version=2.0';
// Include the version in case both GTK3 and GTK4 installed
// otherwise an exception will be thrown
import Gtk from 'gi://Gtk?version=4.0';

// An example GtkApplication with a few bells and whistles, see also:
//     https://wiki.gnome.org/HowDoI/GtkApplication
// This example is based on https://github.com/romgrk/node-gtk/blob/master/examples/gtk-4-custom-widget.js

import Gdk from 'gi://Gdk?version=4.0';
import Graphene from 'gi://Graphene?version=1.0';

Gtk.init();

/* Define our custom widget */

class ICustomWidget extends Gtk.Widget {
  customMethod() {
    console.log("Hello from CustomWidget.customMethod")
  }

  vfunc_measure(orientation: Gtk.Orientation, forSize: number) {
    const [minWidth, natWidth] = [100, 200]
    const [minHeight, natHeight] = [20, 40]
    const isHorizontal = orientation === Gtk.Orientation.HORIZONTAL

    const minimum         =  isHorizontal ? minWidth : minHeight
    const natural         =  isHorizontal ? natWidth : natHeight
    const minimumBaseline = !isHorizontal ? minWidth : minHeight
    const naturalBaseline = !isHorizontal ? natWidth : natHeight

    return [minimum, natural, minimumBaseline, naturalBaseline] as [number, number, number, number]
  }

  vfunc_snapshot(snapshot: Gtk.Snapshot) {
    const width = this.get_allocated_width()
    const color = new Gdk.RGBA()
    color.parse('red');
    const rect = new Graphene.Rect().init(10, 10, width / 2, 10)
    snapshot.append_color(color, rect)
  }
}

const CustomWidget = GObject.registerClass({
  GTypeName: 'CustomWidget',
}, ICustomWidget );



/* Setup & start the application */

const loop = GLib.MainLoop.new(null, false)
const app = new Gtk.Application({
  applicationId: 'com.github.jumplink.gjs.demo',
  flags: 0
})
app.connect('activate', onActivate)
const status = app.run([])

console.log('Finished with status:', status)

/* Event handlers */

function onActivate() {
  const window = new Gtk.ApplicationWindow({application: app})
  window.set_title('Window')
  window.set_default_size(500, 500)
  window.connect('close-request', onQuit)
    window.fullscreen()
  const ui = getUI()
  const builder = Gtk.Builder.new_from_string(ui, ui.length)
  const root = builder.get_object('root') as Gtk.Box

  const homeButton = builder.get_object('homeButton') as Gtk.Button
  homeButton?.connect('clicked', () => {
    console.log('Home button clicked')
  })

  const aboutButton = builder.get_object('aboutButton') as Gtk.Button
  aboutButton?.connect('clicked', () => {
    console.log('About button clicked')
  })

  if(root) window.set_child(root)
  window.present()

  loop.run()
}

function onQuit() {
  loop.quit()
  app.quit()
  return false
}

function getUI() {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <interface>
      <requires lib="gtk" version="4.0"/>
      <object class="GtkBox" id="root">
        <property name="orientation">vertical</property>
        <child>
          <object class="GtkBox" id="navbar">
            <property name="orientation">horizontal</property>
            <child>
              <object class="GtkButton" id="homeButton">
                <property name="label" translatable="yes">Home</property>
              </object>
            </child>
            <child>
              <object class="GtkButton" id="aboutButton">
                <property name="label" translatable="yes">About</property>
              </object>
            </child>
          </object>
        </child>
      </object>
    </interface>
  `
}