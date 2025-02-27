using System;
using System.Collections.Generic;

namespace WebApplication6.Models;

public partial class Jezyk
{
    public int Id { get; set; }

    public string Nazwa { get; set; } = null!;

    public virtual ICollection<Obsługuje> Obsługujes { get; set; } = new List<Obsługuje>();

    public virtual ICollection<Tłumaczeniewykonane> TłumaczeniewykonaneJęzykDocelowyNavigations { get; set; } = new List<Tłumaczeniewykonane>();

    public virtual ICollection<Tłumaczeniewykonane> TłumaczeniewykonaneJęzykŹródłowyNavigations { get; set; } = new List<Tłumaczeniewykonane>();
}
